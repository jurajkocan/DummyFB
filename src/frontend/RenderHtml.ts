/**
 * Will render HTML Template
 * @param title - page title
 * @param styleSrc - sources for external css styles
 * @param style - page style, rendered by typestyle
 * @param initState - object that will be put inside INIT_STATE
 * @param bodyHtml - html that will be put inside body tag
 * @param scriptSrc - sources for external javascript files
 */
export const renderHtml = <S extends object>(
    title: string,
    styleSrc: string[],
    style: string,
    initState: S,
    bodyHtml: string,
    scriptSrc: string[]
) => `<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="icon" href="favicon.ico">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${title}</title>
    ${styleSrc.map(src => `<link href="${src}" rel="stylesheet">`).join("")}
        <style>${style}</style>
</head>
<body>
    <script type="text/javascript">
        window.INIT_STATE = ${JSON.stringify(initState)};
    </script>
    <div id="root" style="height: 100%">${bodyHtml}</div>
    ${scriptSrc
        .map(src => `<script type="text/javascript" src="${src}"></script>`)
        .join("")}
</body>
</html>`;
