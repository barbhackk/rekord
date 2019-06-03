import { Component, OnInit, Injectable, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public info     : any;
  public url      : string;
  public loaded   : boolean = false;
  public working  : boolean = false;
  public convert  : boolean = false;
  public remainingminute  : number  = 0;
  public download : number  = 0;
  public total    : number  = 0;

  // Config Round Progress
  public current  : number  = 0;

  /**
   * Constructeur par défaut
   */
  constructor(private _electronService : ElectronService, private _ngZone: NgZone) {
    
    let _electronGetInfo = this._electronService.remote.ipcMain.on('info', (args) => {
      this._ngZone.run(() => {
        this.info = args.info;
        this.loaded = true;
      });
    });

    let _electronStart = this._electronService.remote.ipcMain.on('start', (args) => {
      this._ngZone.run(() => {
        this.current = 0;
      });
    });

    let _electronProgress = this._electronService.remote.ipcMain.on('progress', (args) => {
      this._ngZone.run(() => {
        this.current += (args.percent - this.current);
        this.remainingminute = args.remainingminute;
        this.download = parseFloat((args.download / 1024 / 1024).toFixed(2));
        this.total = parseFloat((args.t / 1024 / 1024).toFixed(2));
      });
    });

    let _electronEnd = this._electronService.remote.ipcMain.on('end', (args) => {
      this._ngZone.run(() => {
        this.current = 0;
        this.working = false;
        this.reset();
      });
    });

    let receptUrl = this._electronService.remote.ipcMain.on('clipboard', (args) => {
      this._ngZone.run(() => {
        this.url = args.url;
        this.getInfo(args.url);
      });
    });

    let _electronConvert = this._electronService.remote.ipcMain.on('convert', (args) => {
      this._ngZone.run(() => {
        if(!this.convert){
          this.convert = true;
          this.current = 0;
        }
        this.current += (args.percent.toFixed(2) - this.current);
      });
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  /**
   * Récupération des informations de la vidéo
   */
  getInfo(u){
    this._electronService.ipcRenderer.send('getInfo', {url: u});
  }

  reset(){
    this.loaded = false;
    this.info = null;
    this.url = "";
    this.remainingminute = 0;
    this.download = 0;
    this.total = 0;
  }

  /**
   * Téléchargement du média
   */
  downloadFile(e: any){
    e.preventDefault();
    if(this.loaded && !this.working){
      this.working = true;
      this._electronService.ipcRenderer.send('download', {url: this.url, info : this.info});
    }
  }
}
