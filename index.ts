import axios from 'axios';
import WebSocket from 'ws';

const BinanceWebsocket = new WebSocket('wss://stream.binance.com:9443/ws/pixelusdt@trade');

BinanceWebsocket.onmessage = function (event) {
    const BinanceResult = event.data ? JSON.parse(event.data.toString()) : '';
    console.log(`PIXEL-USDT: ${parseFloat(BinanceResult.p).toFixed(5)}`);
};

interface KucoinConfig {
    Token: string;
    Endpoint: string;
    PingInterval: number;
    PingTimeout: number;
    Encrypt: boolean;
    Protocol: string;
};

axios.post('https://api.kucoin.com/api/v1/bullet-public')
    .then(response => {
        const data = response.data.data;
        const KucoinConfig: KucoinConfig = {
            Token: data.token,
            Endpoint: data.instanceServers[0].endpoint,
            PingInterval: data.instanceServers[0].pingInterval,
            PingTimeout: data.instanceServers[0].pingTimeout,
            Encrypt: data.instanceServers[0].encrypt,
            Protocol: data.instanceServers[0].protocol
        };
        console.log(KucoinConfig);

        const KucoinWebsocket = new WebSocket(`wss://ws-api-spot.kucoin.com?token=${KucoinConfig.Token}&[]`);
        let IsSubscribed = false;

        KucoinWebsocket.onopen = () => {
            console.log("WebSocket connection established");

            setInterval(() => {
                if (KucoinWebsocket.readyState === WebSocket.OPEN) {
                    KucoinWebsocket.send('ping');
                    console.log("Ping sent");
                };
            }, KucoinConfig.PingInterval);
        };

        KucoinWebsocket.onmessage = (event) => {

            try {
                const dataString = event.data ? event.data.toString() : '';
                const CryptoData = JSON.parse(dataString);

                if (CryptoData.data && 'price' in CryptoData.data) {
                    console.log(`${CryptoData.topic.split(':')[1]}: ${parseFloat(CryptoData.data.price).toFixed(5)}`);
                } else {
                    console.log("Price is not available in the data object");
                };

                if (CryptoData && !IsSubscribed) {
                    const KucoinID = CryptoData.id;

                    if (KucoinID) {
                        const Subscriptions = [
                            "/market/ticker:NEON-USDT",
                            "/market/ticker:MAVIA-USDT",
                            "/market/ticker:KAS-USDT",
                            "/market/ticker:MYRO-USDT"
                        ].map(topic => ({
                            "id": KucoinID,
                            "type": "subscribe",
                            "topic": topic,
                            "privateChannel": false,
                            "response": true
                        }));

                        Subscriptions.forEach(Subscription => {
                            KucoinWebsocket.send(JSON.stringify(Subscription));
                        });
                        IsSubscribed = true;
                        console.log("Subscription messages sent");
                    };
                };

            } catch (error) {
                console.error("Error parsing JSON:", error);
            };
        };

        KucoinWebsocket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        KucoinWebsocket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    })
    .catch(error => {
        console.error(error);
    });