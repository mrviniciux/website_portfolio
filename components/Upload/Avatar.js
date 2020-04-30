import { Upload, Icon, Modal } from 'antd';
import {convertURLtoBlob} from '../../utils/helpers';
import 'isomorphic-fetch';


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class Avatar extends React.Component {

  constructor(props){
    super(props);  
    this.state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        id: null
    };
  }

  componentWillMount(){
    this.renderImgAvatar();
  }
  
  async renderImgAvatar() {
    const blobImgAvatar = await convertURLtoBlob(this.props.mainObject.attributes.avatar, this.props.employee.attributes.name);
    const originBlobImg = blobImgAvatar;
    blobImgAvatar.status = "done";
    blobImgAvatar.uid = "1";
    blobImgAvatar.originFileObj = Object.assign({}, originBlobImg);
    blobImgAvatar.percent = 100;


    this.handleChange({file: blobImgAvatar, fileList: [blobImgAvatar]});
  }

  

  handleCancel = () => {
    this.setState({ previewVisible: false });
    
  }

  handleRemove = (object) => {
   // this.props.destroyPhoto(this.props.mainObject);
  }

  handleAction = (photo) => {
    //this.props.upload(Object.assign({}, Object.assign({}, this.props.mainObject, this.props.mainObject.attributes), {file: photo}));
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async info => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);

    if(!info.file.url){
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }

        
        return file;


      });
    }

    // fileList = [
    //   {
    //     uid: '1',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   }
    // ]
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          accept={"image/*"}
          action={this.handleAction}
          className="avatar-uploader"
          listType="picture-card"
          multiple={false}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}