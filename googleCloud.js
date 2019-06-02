const key = require ('key.json');

const keyFilename= key; //replace this with api key file
const projectId = key.project_id; //replace with your project id
const bucketName = key.project_id+'.appspot.com';

const gcs = require('@google-cloud/storage')({
    projectId,
    keyFilename
});

const bucket = gcs.bucket(bucketName);

const filePath = `./package.json`;
const uploadTo = `subfolder/package.json`;
const fileMime = mime.lookup(filePath);


bucket.upload(filePath,{
    destination:uploadTo,
    public:true,
    metadata: {contentType: fileMime,cacheControl: "public, max-age=300"}
}, function(err, file) {
    if(err)
    {
        console.log(err);
        return;
    }
    console.log(createPublicFileURL(uploadTo));
});


function createPublicFileURL(storageName) {
    return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(storageName)}`;

}