import { File } from '@ionic-native/File/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private platform: Platform,
    private file: File,
    private ft: FileTransfer,
    private fileOpener: FileOpener,
    private document: DocumentViewer) {}

  openLocalPdf() {
    let filePath = this.file.applicationDirectory + 'www/assets';

    if (this.platform.is('android')) {
      const fakeName = Date.now();
      this.file.copyFile(filePath, '5-tools.pdf', this.file.dataDirectory, `${fakeName}.pdf`).then(result => {
        this.fileOpener.open(result.nativeURL, 'application/pdf');
      });

    } else {
      const options: DocumentViewerOptions = {
        title: 'My PDF'
      };
      this.document.viewDocument(`${filePath}/5-tools.pdf`, 'application/pdf', options);
    }
  }

  downloadAndOpenPdf() {
    let downloadUrl = 'https://ws.autoscore.com.br/check/52421786-7e9c-4247-83ff-18e8d7bd5cca';
    let path = this.file.dataDirectory;
    const transfer = this.ft.create();

    transfer.download(downloadUrl, `${path}myfile.pdf`).then(entry => {
      let url = entry.toURL();
      if (this.platform.is('ios')) {
        this.document.viewDocument(url, 'application/pdf', {});

      } else {
        this.fileOpener.open(url, 'application/pdf');
      }

    });
  }
}
