import { Component, OnInit,OnDestroy } from '@angular/core';
import {WindowRefService} from '../window-ref.service';
import {MdSnackBar,MdSnackBarRef} from '@angular/material';
import {MdDialog, MdDialogRef} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {ActionBarComponent} from '../action-bar/action-bar.component';
import {TourDialogComponent} from '../tour-dialog/tour-dialog.component';
@Component({
  selector: 'app-vr',
  templateUrl: './vr.component.html',
  styleUrls: ['./vr.component.scss']
})
export class VrComponent implements OnInit,OnDestroy {
  window;
  snackBarRef;
  timeOutId;
  isListening : boolean = false;
  constructor(private windowRef: WindowRefService,
              public snackBar: MdSnackBar,
              public dialog: MdDialog) {
    this.window = windowRef.nativeWindow;
  }
  dialogRef;
  ngOnDestroy() {
    if(this.dialogRef){
      this.dialogRef.close();
    }
    if(this.snackBarRef){
      this.snackBarRef.dismiss();
    }
  }
  openSnackBar() {
    this.snackBarRef = this.snackBar.open('Listening','STOP');
    //this.snackBarRef = this.snackBar.openFromComponent(ActionBarComponent);
    this.snackBarRef.afterDismissed().subscribe(() => {
        this.abortListening();
    });
  };

  addPoi(id,x,y,z){
    this.window.awe.pois.add({ id:id, position: { x:x, y:y, z:z } });
  }
  openDialog() {
    this.dialogRef = this.dialog.open(DialogComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      //this.selectedOption = result;
    });
  }
  startListening(){
    let that = this;
    let timeoutId;
    if(!this.isListening){
      this.window.annyang.start();
      this.isListening = true;
      this.openSnackBar();
      this.timeOutId = setTimeout(function(){
        that.snackBarRef.dismiss();
      },15000);
    }
  }
  abortListening(){
    if(this.isListening){
    this.window.annyang.abort();
    this.window.annyang.removeCommands();
    this.snackBarRef.dismiss();
    if(this.timeOutId){
      clearTimeout(this.timeOutId);
    }
    this.isListening = false;
    }
  }
  addAllPoi(){
    this.addPoi('A',50,-70,-200);
    this.addPoi('B',-100,50,35);
    this.addPoi('C',-80,-25,50);
    this.addPoi('D',-70,50,120);
    this.addPoi('E',100,-35,-20);
    this.addPoi('F',50,-20,-300);
    this.addPoi('G',150,70,-60);
    this.addPoi('H',-30,0,-120);
    this.addPoi('I',-60,-50,-70);
    this.addPoi('J',80,-45,-90);
    this.addPoi('K',-90,5,-50);
    this.addPoi('L',-50,90,-90);
    this.addPoi('M',-45,65,45);
    this.addPoi('N',35,10,-150);
    this.addPoi('O',-90,-150,90);
    this.addPoi('P',-45,-75,-45);
    this.addPoi('Q',150,15,100);
    this.addPoi('R',75,40,-110);
    this.addPoi('S',-200,50,45);
    this.addPoi('T',50,-60,60);
    this.addPoi('U',70,45,45);
    this.addPoi('V',25,-75,-250);
    this.addPoi('W',45,-150,70);
    this.addPoi('X',0,10,150);
    this.addPoi('Y',-100,-25,100);
    this.addPoi('Z',60,100,45);
  }

  addProjection(id: string,text:string,poi_id:string,color:string){
    this.window.awe.projections.add({
      id:id,
      "geometry" : {
         "font_url" : "helvetiker_bold.typeface.js",   /// REQUIRED - currently must be .js not .json
         "parameters" : {
            bevelEnabled:true,
            bevelSize:1.5,
            bevelThickness:2,
            curveSegments:10,
            size:40,
            height:10
         },
         animation: { duration: 10, persist: 0, repeat: Infinity },
         rotation:{ y: 360 },
        //  texture: { path: 'awe_orange_square.png' },
         "shape" : "text",
         "text" : text, // put your text here
      },
      material:{
        type: 'phong',
        color:color,
        opacity: 0.9,
        transparent:true
      },
    }, { poi_id: poi_id });
  }

  addAllProjection(){
    let projections = [{'A':'#fbbeb7'},
          {'B':'#45B39D'},
          {'C':'#F7DC6F'},
          {'D':'#85C1E9'},
          {'E':'#82E0AA'},
          {'F':'#E74C3C'},
          {'G':'#A569BD'},
          {'H':'#17A589'},
          {'I':'#A569BD'},
          {'J':'#F4F6F7'},
          {'K':'#ff3399'},
          {'L':'#ffff66'},
          {'M':'#996600'},
          {'N':'#ffff00'},
          {'O':'#990000'},
          {'P':'#6600ff'},
          {'Q':'#0099cc'},
          {'R':'#00cc00'},
          {'S':'#3399ff'},
          {'T':'#cc33ff'},
          {'U':'#cccc00'},
          {'V':'#333300'},
          {'W':'#00ff99'},
          {'X':'#ff6699'},
          {'Y':'#9966ff'},
          {'Z':'#99cc00'}];
          projections.forEach(projection=>{
            let key :string= Object.keys(projection)[0];
            this.addProjection(key.toLowerCase(),key,key,projection[key]);
          });
          var that=this;
          setTimeout(function(){
            that.addRotation(projections);
          });
  }

  addRotation(projections){
    projections.forEach(projection=>{
      let key :string= Object.keys(projection)[0];
        var p = this.window.awe.projections.view(key.toLowerCase());
        this.window.awe.projections.update({ // rotate clicked object by 180 degrees around x and y axes over 10 seconds
          data:{
            animation: { duration: 10, persist: 0, repeat: Infinity },
            rotation:{ y: p.rotation.y+360 }
          },
          where:{ id:key.toLowerCase() }
        });
    });
  }

  ngOnInit() {
    let that = this;
    this.dialog.open(TourDialogComponent);
    // <i class="material-icons">open_with</i>
    // this.window.screen.orientation.lock('landscape')
    //this.window.addEventListener('load', function() {
  // initialize awe after page loads
  this.window.awe.init({
    // automatically detect the device type
    device_type: this.window.awe.AUTO_DETECT_DEVICE_TYPE,
    // populate some default settings
    settings: {
      container_id: 'container',
      fps: 30,
      default_camera_position: { x:0, y:0, z:0 },
      default_lights:[
        {
          id: 'hemisphere_light',
          type: 'hemisphere',
          color: 0xCCCCCC
        },
      ],
    },
    ready: function() {
      var d = '?_='+Date.now();

      // load js files based on capability detection then setup the scene if successful
      that.window.awe.util.require([
        {
          capabilities: ['webgl','gum'],
          files: [
              [ '../../js/awe-standard-dependencies.js'+d, '../../js/awe-standard.js'+d ], // core dependencies for this app
            ['../../js/plugins/StereoEffect.js'+d, '../../js/plugins/VREffect.js'+d], // dependencies for render effects
            '../../js/plugins/awe.rendering_effects.js'+d,
            '../../js/plugins/awe-standard-object_clicked_or_focused.js'+d, // object click/tap handling plugin
            '../../js/awe.gyro.js'+d, // basic gyro handling
            '../../js/awe.mouse.js'+d, // basic mouse handling
          ],
          success: function() {
            // setup and paint the scene
            that.window.awe.setup_scene();

            var click_plugin = that.window.awe.plugins.view('object_clicked');
            if (click_plugin) {
              click_plugin.register();
              click_plugin.enable();
            }
            var gyro_plugin = that.window.awe.plugins.view('gyro');
            if (gyro_plugin) {
              gyro_plugin.enable();
            }
            var mouse_plugin = that.window.awe.plugins.view('gyro');
            if (gyro_plugin) {
              gyro_plugin.enable();
            }

            that.window.awe.settings.update({data:{value: 'ar'}, where:{id: 'view_mode'}})
            var render_effects_plugin = that.window.awe.plugins.view('render_effects');
            if (render_effects_plugin) {
              render_effects_plugin.enable();
            }

            // setup some code to handle when an object is clicked/tapped
            that.window.addEventListener('object_clicked', function(e) {

              if (that.window.annyang) {
                  that.abortListening();
                    // Let's define our first command. First the text we expect, and then the function it should call
                    let commands={};
                    commands['Letter '+ e.detail.projection_id.toUpperCase()] =function(){
                      that.abortListening();
                      that.openDialog();
                    }
                    commands['Alphabet '+ e.detail.projection_id.toUpperCase()] =function(){
                      that.abortListening();
                      that.openDialog();
                    }
                    commands[e.detail.projection_id.toUpperCase()] =function(){
                      that.abortListening();
                      that.openDialog();
                    }
                    // Add our commands to annyang
                    that.window.annyang.addCommands(commands,true);
                    // Start listening. You can call that here, or attach that call to an event, button, etc.
                    let audioEle = that.window.document.getElementById("my_audio");
                    audioEle.play();
                    audioEle.addEventListener('ended',function(e){
                        that.startListening();
                      }, false);
                  }
                  var p = that.window.awe.projections.view(e.detail.projection_id);
                  that.window.awe.projections.update({ // rotate clicked object by 180 degrees around x and y axes over 10 seconds
                    data:{
                      animation: { duration: 10, persist: 0, repeat: Infinity },
                      rotation:{ y: p.rotation.y+360 }
                    },
                    where:{ id:e.detail.projection_id }
                  });
            }, false);

            // add some points of interest (poi) for each of the compass points
            that.addAllPoi();
            that.addAllProjection();



          },
        },
        { // else create a fallback
          capabilities: [],
          files: [],
          success: function() {
            document.body.innerHTML = '<p>This demo currently requires a standards compliant mobile browser.';
            return;
          },
        },
      ]);
    }
  });
//});
  }

}
