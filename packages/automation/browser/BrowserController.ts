export class BrowserController {

  open(url: string) {
    window.open(url, "_blank");
  }

  search(query: string) {
    const url =
      `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    this.open(url);
  }

}