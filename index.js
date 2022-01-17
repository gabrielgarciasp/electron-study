const {
    app,
    BrowserWindow,
    Tray,
    Menu,
    shell,
    nativeImage,
} = require("electron");
const path = require("path");

const DEV = !app.isPackaged;
const BASE_PATH_ASSETS = path.join(DEV ? "" : process.resourcesPath, "assets");

const DOG_IMAGE = nativeImage.createFromPath(
    path.join(BASE_PATH_ASSETS, "window-image.png")
);
const CAT_IMAGE = nativeImage.createFromPath(
    path.join(BASE_PATH_ASSETS, "tray-image.png")
);

let tray = null;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 800,
        icon: DOG_IMAGE,
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

    tray = new Tray(CAT_IMAGE);
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
