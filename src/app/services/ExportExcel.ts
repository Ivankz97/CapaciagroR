import { Injectable } from '@angular/core';
/*import * as FileSaver from 'file-saver';*/
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
let columns = ["ID", "Name", "Country"];
let rows = [];
@Injectable()
export class ExcelService {

  constructor() { }


  public exportAsExcelFile(json: any[], excelFileName: string): void {
    console.log("Nombre del excel", excelFileName);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    console.log("worksheet--->", worksheet);
    console.log("workbook--->", workbook);
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    console.log("excelBuffer -->", excelBuffer);
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }


  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    //FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
  public exportAsPdfFile(json: any[]): void {
    // console.log("JSON keys",json.keys);
    rows = [];
    columns = Object.keys(json[0])
    json.forEach(e => {
      let data = []
      columns.forEach(c => {
        data.push(e[c])
      })
      rows.push(data);
    });
    console.log("Column--->", columns)
    console.log("Row---->", rows)
    console.log("keys", Object.keys(json[0]));
    var doc = new jsPDF('landscape');
    doc.autoTable(columns, rows, {
      theme: 'grid',
      styles: { 
        cellPadding: 5 
      },
      headerStyles: {
        fillColor: [180, 81, 81],
      }
    });
    let docBase64 = doc.output('datauri');
    console.log("DOC -->", doc.output('datauri'));
    return docBase64
  }

}
