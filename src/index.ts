import { AvailableIntentsEventsEnum, createOpenAPI, createWebsocket, IMessage } from 'qq-guild-bot';

const botConfig = {
    appID: '102010406', // 申请机器人时获取到的机器人 BotAppID
    token: 'yFDNCbLZQ7OWHoNuHmVvZokoN7xk25aT', // 申请机器人时获取到的机器人 BotToken
    intents: [AvailableIntentsEventsEnum.PUBLIC_GUILD_MESSAGES], // 事件订阅,用于开启可接收的消息类型
    sandbox: true, // 沙箱支持，可选，默认false. v2.7.0+
};

// 创建 client
const client = createOpenAPI(botConfig);
// 创建 websocket 连接
const ws = createWebsocket(botConfig);

// 注册用户 at 机器人消息事件
ws.on(AvailableIntentsEventsEnum.PUBLIC_GUILD_MESSAGES, (data: { msg: IMessage }) => {
    const content = data.msg.content;
    console.log(JSON.stringify(data));
    if (content.includes('hello')) {
        client.messageApi.postMessage(data.msg.channel_id, { content: '你好' }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }
});
