const axios = require('axios');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const { format, addDays } = require('date-fns');

class BSEDownloader {
  constructor() {
    this.baseURL = 'https://www.bseindia.com';
  }

  async downloadForDate(date, outputDir) {
    const formattedDate = format(new Date(date), 'ddMMyy');
    const zipFileName = `EQ${formattedDate}_CSV.ZIP`;
    const zipUrl = `${this.baseURL}/download/BhavCopy/Equity/${zipFileName}`;
    const zipFilePath = path.join(outputDir, zipFileName);

    try {
      // Ensure the output directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`Created directory: ${outputDir}`);
      }

      // Download the ZIP file
      await this.downloadFile(zipUrl, zipFilePath);

      // Extract the ZIP file contents
      await this.extractZIP(zipFilePath, outputDir);

      console.log(`ZIP file extracted to: ${outputDir}`);
    } catch (error) {
      console.error(`Error downloading or extracting ZIP file for date ${date}: ${error.message}`);
      // Ensure the ZIP file is deleted if the download or extraction fails
      this.deleteFile(zipFilePath);
    }
  }

  async downloadFile(url, filePath) {
    try {
      const response = await axios({
        method: 'GET',
        url,
        responseType: 'arraybuffer',
      });
      fs.writeFileSync(filePath, response.data);
      console.log(`ZIP file downloaded to: ${filePath}`);
    } catch (error) {
      throw new Error(`Error downloading file from ${url}: ${error.message}`);
    }
  }

  async extractZIP(zipFilePath, outputDir) {
    try {
      const zip = new AdmZip(zipFilePath);
      zip.extractAllTo(outputDir, true);
    } catch (error) {
      throw new Error(`Error extracting ZIP file ${zipFilePath}: ${error.message}`);
    }
  }

  deleteFile(filePath) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${filePath}`);
    }
  }

  async downloadDataForDateRange(startDate, endDate, outputDir) {
    try {
      let currentDay = new Date(startDate);
      const endDay = new Date(endDate);

      while (currentDay <= endDay) {
        await this.downloadForDate(currentDay, outputDir);
        currentDay = addDays(currentDay, 1);
      }

      return true;
    } catch (error) {
      console.error(`Error downloading or extracting ZIP files between ${startDate} and ${endDate}: ${error.message}`);
      return false;
    }
  }

  async downloadTodayData(outputDir) {
    try {
      const today = new Date();
      await this.downloadAndExtractZIP(today, outputDir);
      console.log(`Downloaded and extracted ZIP for today: ${format(today, 'yyyy-MM-dd')}`);
      return true;
    } catch (error) {
      console.error(`Error downloading or extracting ZIP file for today: ${error.message}`);
      return false;
    }
  }
}

module.exports = BSEDownloader;
