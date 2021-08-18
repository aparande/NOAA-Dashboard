import React, {useCallback} from 'react';
import styles from './uploadbox.module.css';
import { Button } from 'react-bootstrap';
import {useDropzone} from 'react-dropzone';
import { CgSoftwareUpload } from 'react-icons/cg';

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    for (var i=0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
            var tarr = [];
            for (var j=0; j < data.length; j++) {
                if (j == 0) {
                    console.log("tabs are obnox");
                  // Check date
                  if (!isValidDate(data[j])) {
                    return "Date is Invalid"
                  }
                } else if (j == 1) {
                  // Check Lat
                  if (!(-90 <= data[j] && data[j] <= 90)) {
                    return "Latitude is Invalid"
                  }
                } else if (j == 2) {
                  // Check Lon
                  if (!(-180 <= data[j] && data[j] <= 180)) {
                    return "Longitude is Invalid"
                  }
                }
                tarr.push(data[j]);
            }
            lines.push(tarr);
    }
    console.log(lines);

    // Check csv header names & size
    if (lines[0].length != 3) {
      return "Incorrect number of columns"
    }

    return true
}

// https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
function isValidDate(dateString)
{
    // First check for the pattern
    // var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    var date_regex = /^(0?[1-9]|[1][0-2])/[0-9]+/[0-9]+ (0?[0-9]|1[0-9]|2[0-3]):[0-9]+$/i;
    
    if (!(date_regex.test(dateString))) {
        return false;
    }

    // Check the range of the day
    return true;
};

const UploadBox = ({ title, description }) => {
    
    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsText(file);
  
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = (event) => {
            // Do whatever you want with the file contents
          const data = event.target.result;
          console.log(processData(data));
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
    </div>
    )
  }
export default UploadBox;
  