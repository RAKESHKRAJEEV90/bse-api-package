# BSE-API-PACKAGE

BSE-API-PACKAGE is a Node.js library that facilitates downloading and extracting ZIP files containing Bhavcopy (trading data) from the Bombay Stock Exchange (BSE) website.

## Installation

Install the package via npm:

```bash
npm install bse-api-package
```

## Features

-  Download and extract ZIP files containing Bhavcopy data from BSE for a specific date or date range.
-  Retrieve today's Bhavcopy data directly.
-  Save extracted files to a specified output directory.

## Usage
### Importing the Module


```bash
const BSEDownloader = require('bse-api-package');
const downloader = new BSEDownloader();
```

### Download and Extract Today's Data

``` bash

const outputDir = '/path/to/your/output/directory';

downloader.downloadTodayData(outputDir)
  .then(success => {
    if (success) {
      console.log('Downloaded and extracted ZIP for today');
    } else {
      console.log('Failed to download or extract ZIP for today');
    }
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

```
### Download and Extract specific date Data

```bash

const outputDir = '/path/to/your/output/directory';
const date =new Date('2023-05-27');

downloader.downloadForDate(date, outputDir)
  .then(success => {
    if (success) {
      console.log('Downloaded and extracted ZIP for today');
    } else {
      console.log('Failed to download or extract ZIP for today');
    }
  });
```
### Download Data for a Date Range

```bash

const outputDir = '/path/to/your/output/directory';
const startDate = new Date('2023-06-27');
const endDate = new Date('2023-06-30');

downloader.downloadDataForDateRange(startDate, endDate, outputDir)
  .then(success => {
    if (success) {
      console.log(`Downloaded and extracted ZIP files between ${startDate} and ${endDate}`);
    } else {
      console.log(`Failed to download or extract ZIP files between ${startDate} and ${endDate}`);
    }
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

```

# API Documentation

`downloadTodayData(outputDir: string): Promise<boolean>`
Downloads and extracts the Bhavcopy ZIP file for today's date.

- `outputDir`: The directory path where the extracted files will be saved.

`downloadForDate(date: Date,outputDir: string): Promise<boolean>`
Downloads and extracts the Bhavcopy ZIP file for given date.

- `outputDir`: The directory path where the extracted files will be saved.

`downloadDataForDateRange(startDate: Date, endDate: Date, outputDir: string): Promise<boolean>`
Downloads and extracts Bhavcopy ZIP files for a date range.

- `startDate`: The start date (inclusive) of the date range.
- `endDate`: The end date (inclusive) of the date range.
- `outputDir`: The directory path where the extracted files will be saved.


# License

This project is licensed under the MIT License - see the LICENSE file for details.


### Explanation:

- **Installation**: Provides instructions on how to install the package using npm.

- **Features**: Lists the main features of the BSE-API-PACKAGE package.

- **Usage**: Demonstrates how to import the module, use methods to download and extract ZIP files, and handle success or failure callbacks.

- **API Documentation**: Detailed documentation for each method, including parameters and return types.

- **License**: Information about the licensing of the package.

You can adjust the paths, error handling, and logging as per your specific application requirements. This README.md file should provide a clear guide for users on how to install, use, and understand your BSE-API-PACKAGE package. Adjust the examples and descriptions based on any additional functionality or customization you provide in your library.


## Note: 
This is only for study purpose

