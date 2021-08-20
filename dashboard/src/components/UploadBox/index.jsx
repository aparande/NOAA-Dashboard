import React, {useCallback, useState} from 'react';
import styles from './uploadbox.module.css';
import { Button } from 'react-bootstrap';
import {useDropzone} from 'react-dropzone';
import { CgSoftwareUpload } from 'react-icons/cg';

// https://blog.mounirmesselmeni.de/2012/11/20/reading-csv-file-with-javascript-and-html5-file-api/
function processTrace(csv) {
    let allTextLines = csv.split(/\r\n|\n/);

    // Check csv header names & size
    if (allTextLines[0].split(',').length != 3) {
      return "Expected 3 columns in .csv, i.e. date, lat, and lon"
    }

    let lines = [];
    // Start with i = 1 to skip header
    for (let i=1; i<allTextLines.length; i++) {
        let data = allTextLines[i].split(',');
            let tarr = [];
            for (let j=0; j<data.length; j++) {
                let dataj = parseInt(data[j])
                if (j === 0) {
                  // Check date
                  let isValidDate = /^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{1,2}$/.test(data[j])
                  if (!isValidDate) {
                    return "Date is Invalid"
                  }
                } else if (j === 1) {
                  // Check Lat
                  if (dataj < -90 || dataj > 90) {
                    return "Latitude is Invalid"
                  }
                } else if (j === 2) {
                  // Check Lon
                  if (dataj < -180 || dataj > 180) {
                    return "Longitude is Invalid"
                  }
                }
            }
    }

    return 'Success';
}

// Buoy TOL data
function processTOL(csv) {
    let allTextLines = csv.split(/\r\n|\n/);
    let header = allTextLines[0].split(',');

    for (let i=0; i<header.length; i++) {
      let col = header[i];
      if (i === 0) {
        if (col !== "yyyy-mm-ddTHH:MM:SSZ")
          return "Header date format incorrect"
      } else {
        let isValidTOL = /TOL_\d+/.test(col);
        if (!isValidTOL) {
          return "TOL header is incorrect"
        }
      }
    }

    return 'Success';
}

// Buoy BB data
function processBB(csv) {
    let allTextLines = csv.split(/\r\n|\n/);
    let header = allTextLines[0].split(',');

    for (let i=0; i<header.length; i++) {
      let col = header[i]
      if (i === 0) {
        if (col !== "yyyy-mm-ddTHH:MM:SSZ")
          return "Header date format incorrect"
      } else {
        let isValidBB = /BB_\d+-\d+/.test(col)
        if (!isValidBB)
          return "BB header is incorrect"
      }
    }

    return 'Success'
}

// https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
function isValidDate(dateString)
{
    // First check for the pattern
    // let date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    let date_regex = /^(0?[1-9]|[1][0-2])/[0-9]+/[0-9]+ (0?[0-9]|1[0-9]|2[0-3]):[0-9]+$/i;

    if (!(date_regex.test(dateString))) {
        return false;
    }

    // Check the range of the day
    return true;
};

const UploadBox = ({ title, description }) => {
    const [uploadStatus, setUploadStatus] = useState('');
    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsText(file);

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = (event) => {
            // Do whatever you want with the file contents
          const data = event.target.result;
          if (title == 'Buoy Track') {
            setUploadStatus(processTrace(data));
          } else if (title == 'BB') {
            setUploadStatus(processBB(data));
          } else {
            setUploadStatus(processTOL(data));
          }
        }
      })

    }, [])
    const {getRootProps, getInputProps} = useDropzone({accept: '.csv', maxFiles: 1, onDrop})

    return (
    <div className={styles.uploadBox} {...getRootProps()}>
        <input {...getInputProps()} />
        <CgSoftwareUpload className={styles.uploadIcon}/>
        <h3>Upload {title}</h3>
        <h5 className={styles.description}>{description}</h5>
        <p className={styles.uploadStatus}>{uploadStatus}</p>
    </div>
    )
  };
export default UploadBox;
