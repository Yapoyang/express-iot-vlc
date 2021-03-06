var express = require('express');
var router = express.Router();
let socketClient = require('../socketclient');
var webCmd;
(function (webCmd) {
    webCmd[webCmd["getTodaylast"] = 1] = "getTodaylast";
    webCmd[webCmd["getTodayAfter"] = 2] = "getTodayAfter";
    webCmd[webCmd["getToday"] = 3] = "getToday";
    webCmd[webCmd["getYesterday"] = 4] = "getYesterday";
    webCmd[webCmd["getDate"] = 5] = "getDate";
    webCmd[webCmd["getDriver"] = 6] = "getDriver";
    webCmd[webCmd["setClientServer"] = 7] = "setClientServer";
    webCmd[webCmd["postReset"] = 8] = "postReset";
    webCmd[webCmd["postDimingBrightness"] = 9] = "postDimingBrightness";
    webCmd[webCmd["postDimingCT"] = 10] = "postDimingCT";
    webCmd[webCmd["postDimingXY"] = 11] = "postDimingXY";
    webCmd[webCmd["postSwitchOnOff"] = 12] = "postSwitchOnOff";
    webCmd[webCmd["postCFMode"] = 13] = "postCFMode";
    webCmd[webCmd["msgError"] = 404] = "msgError";
})(webCmd || (webCmd = {}));
//------------------------------------------------------------------
router.get('/gw/get/today/latest', (req, res, next) => {
    let cmd = {
        cmdtype: webCmd.getTodaylast,
        cmdData: {}
    };
    socketClient.sendMessage(JSON.stringify(cmd))
        .then((data) => {
        //console.log('Received:' + data);
        res.send(data);
    });
});
//-------------------------------------------------------------------
router.get('/gw/get/today/after', (req, res, next) => {
    let seqid = req.query.seqid;
    if (Boolean(seqid)) {
        let cmd = {
            cmdtype: webCmd.getTodayAfter,
            cmdData: { seqid: seqid }
        };
        socketClient.sendMessage(JSON.stringify(cmd))
            .then((data) => {
            //console.log('Received:' + data);
            res.send(data);
        });
    }
    else {
        let cmd = {
            cmdtype: webCmd.msgError,
            cmdData: { msg: "parameter error" }
        };
        res.send(JSON.stringify(cmd));
    }
});
//----------------------------------------------------------------------
router.get('/gw/get/today', (req, res, next) => {
    let cmd = {
        cmdtype: webCmd.getToday,
        cmdData: {}
    };
    socketClient.sendMessage(JSON.stringify(cmd))
        .then((data) => {
        //console.log('Received:' + data);
        res.send(data);
    });
});
//----------------------------------------------------------------------
router.get('/gw/get/yesterday', (req, res, next) => {
    let cmd = {
        cmdtype: webCmd.getYesterday,
        cmdData: {}
    };
    socketClient.sendMessage(JSON.stringify(cmd))
        .then((data) => {
        //console.log('Received:' + data);
        res.send(data);
    });
});
//----------------------------------------------------------------------
router.get('/gw/get/date', (req, res, next) => {
    let year = req.query.year;
    let month = req.query.month;
    let date = req.query.date;
    if (Boolean(year) && Boolean(month) && Boolean(date)) {
        let cmd = {
            cmdtype: webCmd.getDate,
            cmdData: { year: year, month: month, date: date }
        };
        socketClient.sendMessage(JSON.stringify(cmd))
            .then((data) => {
            //console.log('Received:' + data);
            res.send(data);
        });
    }
    else {
        let cmd = {
            cmdtype: webCmd.msgError,
            cmdData: { msg: "parameter error" }
        };
        res.send(JSON.stringify(cmd));
    }
});
//----------------------------------------------------------------------
router.get('/driver/get/latest', (req, res, next) => {
    let driverId = req.query.driverId;
    if (Boolean(driverId)) {
        let cmd = {
            cmdtype: webCmd.getDriver,
            cmdData: { driverId: driverId }
        };
        socketClient.sendMessage(JSON.stringify(cmd))
            .then((data) => {
            console.log('Received:' + data);
            res.send(data);
        });
    }
    else {
        let cmd = {
            cmdtype: webCmd.msgError,
            cmdData: { msg: "parameter error" }
        };
        res.send(JSON.stringify(cmd));
    }
});
//POST
//------------------------------------------------------------------------
router.post('/gw/post/reset', (req, res, next) => {
    let cmd = {
        cmdtype: webCmd.postReset,
        cmdData: {}
    };
    socketClient.sendMessage(JSON.stringify(cmd))
        .then((data) => {
        //console.log('Received:' + data);
        res.send(data);
    });
});
//------------------------------------------------------------------------
router.post('/gw/post/dimming/brightness/', (req, res, next) => {
    let brightness = req.body.brightness;
    let driverId = req.body.driverId;
    if (Boolean(brightness) && Boolean(driverId)) {
        let cmd = {
            cmdtype: webCmd.postDimingBrightness,
            cmdData: { brightness: brightness, driverId: driverId }
        };
        socketClient.sendMessage(JSON.stringify(cmd))
            .then((data) => {
            //console.log('Received:' + data);
            res.send(data);
        });
    }
    else {
        res.send('cmd error');
    }
});
//--------------------------------------------------------------------------
router.post('/gw/post/dimming/colorTemperature/', (req, res, next) => {
    let brightness = req.body.brightness;
    let driverId = req.body.driverId;
    let colorTemperature = req.body.colorTemperature;
    if (Boolean(brightness) && Boolean(driverId) && Boolean(colorTemperature)) {
        let cmd = {
            cmdtype: webCmd.postDimingCT,
            cmdData: { brightness: brightness, driverId: driverId, CT: colorTemperature }
        };
        socketClient.sendMessage(JSON.stringify(cmd))
            .then((data) => {
            console.log('Received:' + data);
            res.send(data);
        });
    }
    else {
        res.send('cmd error');
    }
});
//---------------------------------------------------------------------------
router.post('/gw/post/dimming/colorXY/', (req, res, next) => {
    let brightness = req.body.brightness;
    let driverId = req.body.driverId;
    let colorX = req.body.colorX;
    let colorY = req.body.colorY;
    if (Boolean(brightness) && Boolean(driverId) && Boolean(colorX) && Boolean(colorY)) {
        let cmd = {
            cmdtype: webCmd.postDimingXY,
            cmdData: { brightness: brightness, driverId: driverId, colorX: colorX, colorY: colorY }
        };
        socketClient.sendMessage(JSON.stringify(cmd))
            .then((data) => {
            //console.log('Received:' + data);
            res.send(data);
        });
    }
    else {
        res.send('cmd error');
    }
});
//--------------------------------------------------------------------------
router.post('/driver/post/OnOff', (req, res, next) => {
    let switchOnOff = req.body.switch;
    let driverId = req.body.driverId;
    if (Boolean(switchOnOff) && Boolean(driverId)) {
        let cmd = {
            cmdtype: webCmd.postSwitchOnOff,
            cmdData: { switchOnOff: switchOnOff, driverId: driverId }
        };
        socketClient.sendMessage(JSON.stringify(cmd))
            .then((data) => {
            //console.log('Received:' + data);
            res.send(data);
        });
    }
    else {
        res.send('cmd error');
    }
});
//-------------------------------------------------------------------------
router.post('/driver/post/dimCF', (req, res, next) => {
    let cfMode = req.body.cfMode;
    let driverId = req.body.driverId;
    let brightness = req.body.brightness;
    if (Boolean(cfMode) && Boolean(driverId) && Boolean(brightness)) {
        let cmd = {
            cmdtype: webCmd.postCFMode,
            cmdData: { brightness: brightness, cfMode: cfMode, driverId: driverId }
        };
        socketClient.sendMessage(JSON.stringify(cmd))
            .then((data) => {
            //console.log('Received:' + data);
            res.send(data);
        });
    }
    else {
        res.send('cmd error');
    }
});
//---------------------------------------------------------------------------
//curl -X POST -d "socketRemoteServerIP=192.168.0.106&socketRemoteServerPort=6996"  http://192.168.0.107/vlc/gw/post/remoteServer/
router.post('/gw/post/remoteServer', (req, res, next) => {
    let socketRemoteServerIP = req.body.socketRemoteServerIP;
    let socketRemoteServerPort = req.body.socketRemoteServerPort;
    if (Boolean(socketRemoteServerIP) && Boolean(socketRemoteServerPort)) {
        console.log('get ip :' + socketRemoteServerIP + ' port:' + socketRemoteServerPort + ' from server');
        let cmd = {
            cmdtype: webCmd.setClientServer,
            cmdData: { serverIP: socketRemoteServerIP, serverPort: socketRemoteServerPort }
        };
        socketClient.sendMessage(JSON.stringify(cmd))
            .then((data) => {
            res.send(data);
        });
    }
    else {
        let cmd = {
            cmdtype: webCmd.msgError,
            cmdData: { msg: "parameter error" }
        };
        res.send(JSON.stringify(cmd));
    }
});
module.exports = router;
//curl -X POST -d "socketRemoteServerIP=127.0.0.1&socketRemoteServerPort=6996"  http://127.0.0.1/vlc/gw/post/remoteServer/
