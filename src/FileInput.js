import React, { Component } from 'react';


class FileInput extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.fileInput.current.files[0].name);
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Want to import your people? We got this.
                    <br />
                    <input type="file" ref={this.fileInput}/>
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default FileInput;
