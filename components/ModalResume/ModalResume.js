import { Form, Modal, Button, Select } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import { Flash } from '../Flash';


const { Option } = Select;


export class ModalResume extends React.Component {

    constructor(){
        super();
        this.state = { 
          visible: false,
          loading: false,
          okPermission: false 
        };
    }
    
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    showFile(blob, name){
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      var newBlob = new Blob([blob], {type: "application/pdf"})
    
      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      } 
    
      // For other browsers: 
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);
      var link = document.createElement('a');
      link.href = data;
      link.download=name;
      link.click();
      setTimeout(function(){
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
      }, 100);

      this.setState({loading: false, visible: false});
      Flash.create('success', ['Download request completed!'])

    }

    handleOk = object => {
        this.setState({loading: true});

        switch(object.language){
          case 'pt-br':
            fetch("/static/documents/curriculo.pdf", {method: 'GET'}).then(r => r.blob())
            .then(blob => this.showFile(blob, "Curriculo - Marcos"));
          break;
          case 'en-us':
            fetch("/static/documents/resume.pdf", {method: 'GET'}).then(r => r.blob())
            .then(blob => this.showFile(blob, "Resume - Marcos"));
          break;
        }
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
    };


  render() {
    return (
      <Form
          name="language"
          initialValues={{ language: 'pt-br' }}
          onFinish={this.handleOk}
          initialValues={{ remember: false }}>
        <Button icon={<PaperClipOutlined />} type="primary" onClick={this.showModal}>
          {this.props.buttonTitle}
        </Button>
        <Modal
          title={this.props.modalTitle}
          onFinish={this.handleOk}
          onCancel={this.handleCancel}
          visible={this.state.visible}
          footer={[
            <Button  key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" loading={this.state.loading}  htmlType="submit" type="primary" form="language">
              Submit
            </Button>
            
          ]}
        >
        

          <Form.Item
            label="Language"
            name="language"
            rules={[{ required: true, message: 'Please select a language' }]}
          >
          
            <Select className="margin-left-override"placeholder="Select a language" style={{ width: 200 }} onChange={this.handleChange}>
              <Option value="pt-br">Portuguese</Option>
              <Option value="en-us">English</Option>
            </Select>
          </Form.Item>
        </Modal>
     </Form>
    );
  }
}