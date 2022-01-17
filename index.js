const { app, BrowserWindow, Tray, Menu, shell } = require("electron");

let tray = null;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 800,
        icon: "dog.png",
    });

    win.loadURL("https://google.com.br");

    win.on("close", (event) => {
        event.preventDefault();
        win.hide();
    });

    return win;
};

app.whenReady().then(() => {
    const win = createWindow();

    tray = new Tray("cat.png");
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Link example",
            click: async () => await shell.openExternal("https://google.com"),
        },
        {
            label: "Exit",
            click: () => app.exit(),
        },
    ]);
    tray.setToolTip("This is my application.");
    tray.setContextMenu(contextMenu);
    tray.on("click", () => {
        win.show();
    });
});
