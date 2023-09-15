import X2JS from 'x2js';

export function convertXmlToJson (xml: any) {
    const x2js = new X2JS();
    const document = x2js.xml2js(xml);
    return document;
}