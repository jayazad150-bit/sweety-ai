export async function openWebsite(
  url: string
) {

  if (!url) {
    return {
      success: false,
      message: "No website URL provided"
    };
  }


  return {
    success: true,
    action: "open_website",
    url,
    message:
      `Ready to open ${url}`
  };

}