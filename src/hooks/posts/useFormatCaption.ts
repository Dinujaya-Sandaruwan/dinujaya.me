import DOMPurify from "dompurify";

const formatCaption = async (caption: string) => {
  // Caption
  const captionForFormat = caption;
  // Replace hashtags with links or any other desired formatting
  const formattedCaption = captionForFormat.replace(
    /#(\w+)/g,
    "<span> #$1</span>"
  );

  // Detect and wrap links in <a> tags
  const captionWithLinks = formattedCaption.replace(
    /(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*/g,
    (match) => {
      const slicedLink = match.length > 25 ? `${match.slice(0, 25)}...` : match;
      return `<a href="${match}" target="_blank" rel="noopener noreferrer">${slicedLink}</a>`;
    }
  );

  // Replace newlines with <br> tags
  const captionWithLineBreaks = captionWithLinks.replace(/\n/g, "<br/>");

  // Use DOMPurify to sanitize the HTML content
  return DOMPurify.sanitize(captionWithLineBreaks);
};

export default formatCaption;
