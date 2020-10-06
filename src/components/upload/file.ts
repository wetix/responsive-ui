class FileUpload {
  readonly file: File;
  private reader: FileReader;
  xhr: XMLHttpRequest;

  private img: HTMLImageElement;

  constructor(file: File) {
    this.file = file;
    this.reader = new FileReader();
    this.img = new Image();
    this.reader.addEventListener("load", ({ target }) => {
      this.img.src = target.result.toString();
    });
    this.reader.readAsDataURL(file);
  }
}

export default FileUpload;
