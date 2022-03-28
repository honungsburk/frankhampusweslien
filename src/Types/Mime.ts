export type Mime = "image/jpg" | "image/jpeg" | "image/svg+xml" | "image/png";

export function mimeFromSrc(src: string): Mime | undefined {
  const re = /(?:\.([^.]+))?$/;

  const extR: RegExpExecArray | null = re.exec(src);
  const ext: string | undefined = extR ? extR[1] : undefined;

  switch (ext?.toLowerCase()) {
    case "jpg":
      return "image/jpg";
    case "jpeg":
      return "image/jpeg";
    case "svg":
      return "image/svg+xml";
    case "png":
      return "image/png";
    default:
      return undefined;
  }
}
