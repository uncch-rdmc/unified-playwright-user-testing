# TEST DATA

There are three test data files to facilitate the User Acceptance Testing for HPO Dataverse.

The content inside these files is dummy data and does not matter for the purposes of testing as long as the files themselves are not empty

Test No: 7 (Create Dataset)
1. `sample-dataset-file.txt`: This is the first of two files used in Test 7
2. `sample-dataset-file-2.txt`: This is the second of the two files used in Test 7

Both of the above files are added to the add files package when Playwright tests dataset creation. We use two files instead of a single one for a very particular reason and that is to enable zip downloads. Downloading a zip file with multiple .txt files in Dataverse is easier compared to downloading individual files as the steps to download a single file are harder and more flaky to automate using Playwright. When multiple files are present, Dataverse presents a separate "Download" button which is easier to target as a selector, and lets us verify file downloads very quickly while keeping the flakiness to a minimum. The button is enabled at a minimum of two files, so we used the bare minimum to verify the user flow.

Test No. 9 (Edit File Metadata)
1. `replaced-sample-dataset-file.txt`: This is a .txt file that is used in Test 9 to replace `sample-dataset-file.txt`. Post replace, there should still be two files in the new Playwright test dataset which are `replaced-sample-dataset-file.txt` and `sample-dataset-file.txt`. Other dataset behavior should remain unaffected by the replace test.