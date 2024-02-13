import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  constructor(private storage: AngularFireStorage) {}

  async uploadFile(file: File, path: string): Promise<string> {
    const fileRef = this.storage.ref(path);
    const task = this.storage.upload(path, file);

    return new Promise((resolve, reject) => {
      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            const downloadURL = await fileRef.getDownloadURL().toPromise();
            resolve(downloadURL);
          }),
        )
        .subscribe();
    });
  }

  async deleteFile(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const fileRef = this.storage.ref(path);
      fileRef
        .delete()
        .toPromise()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
