const St = imports.gi.St;       //Button UI Element
const Main = imports.ui.main;    //Panel UI Element
const GLib = imports.gi.GLib;
const GObject = imports.gi.GObject;
const Clutter = imports.gi.Clutter;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Me = imports.misc.extensionUtils.getCurrentExtension();


//Global Variables
let panelButton, panelButtonText;
let myPopup;

var [ok, word, err, exit] = GLib.spawn_command_line_sync('bash word.sh');
var [ok, defini, err, exit] = GLib.spawn_command_line_sync('bash defini.sh');

const MyPopup = GObject.registerClass(
    
    class MyPopup extends PanelMenu.Button {
        
        _init() {

            super._init(0);

            panelButton = new St.Bin({
                style_class : "panel-button"
            });
        
            panelButtonText = new St.Label({
                style_class : 'system-status',
                text : " WOTD "  ,
                y_align : Clutter.ActorAlign.CENTER               
            });
        
            panelButton.set_child(panelButtonText);

            this.add_child(panelButton);

            let pmItem = new PopupMenu.PopupMenuItem(
                'Word of the Day', 
                
            );
            this.menu.addMenuItem(pmItem);
            pmItem.connect('activate', () => {
                location.href = "https://www.wordnik.com/word-of-the-day";
            });

            this.menu.addMenuItem(
                new PopupMenu.PopupMenuItem(
                    word.toString(),
                    {reactive : false}
                )
            );

            this.menu.addMenuItem(
                new PopupMenu.PopupMenuItem(
                    defini.toString(),
                    {reactive : false}
                )
            );
        }
    }
);

function init() {

}

//To enable the extension
function enable() {

    myPopup = new MyPopup();
    Main.panel.addToStatusArea('myPopup', myPopup, 1);
}

//To disable the extension
function disable() {
    
    myPopup.destroy();
}

