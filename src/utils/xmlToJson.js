import X2JS from 'x2js';

export function convertXmlToJson (xml) {
    var x2js = new X2JS();
    var document = x2js.xml2js(xml);
    return document;
}