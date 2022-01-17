const {
    app,
    BrowserWindow,
    Tray,
    Menu,
    shell,
    nativeImage,
} = require("electron");

const DOG_ICON = nativeImage.createFromPath("assets/icons/dog-original.png");
const CAT_ICON = nativeImage.createFromPath("assets/icons/cat.png");
let tray = null;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 800,
        icon: DOG_ICON,
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

    tray = new Tray(CAT_ICON);
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
