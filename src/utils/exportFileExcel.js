import * as XLSX from 'xlsx';

// Kiểm tra xem chuỗi có phải là base64 của hình ảnh không
const isBase64Image = (str) => {
    return /^data:image\/(jpeg|png|jpg|gif|bmp|webp);base64,/.test(str);
};

const exportFileExcel = (data = [], nameWorkSheet = '', fileName = 'test.xlsx') => {
    // Lọc bỏ các trường có chứa base64 hình ảnh
    const sanitizedData = data.map(row => {
        const sanitizedRow = {};
        for (const key in row) {
            if (typeof row[key] === 'string' && isBase64Image(row[key])) {
                // Nếu trường là base64 của hình ảnh, bỏ qua hoặc thay thế bằng giá trị khác
                sanitizedRow[key] = ''; // Hoặc bạn có thể loại bỏ key: delete sanitizedRow[key]
            } else {
                sanitizedRow[key] = row[key]; // Giữ nguyên các giá trị không phải là hình ảnh
            }
        }
        return sanitizedRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(sanitizedData); // Chuyển dữ liệu thành sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, nameWorkSheet);
    XLSX.writeFile(workbook, fileName); // Xuất file
};

export default exportFileExcel;
