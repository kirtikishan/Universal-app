import React from 'react';
import {
    InputGroup,
    DropdownButton,
    Image,
    Col,
    Row,
    Well,
    Panel,
    FormControl,
    FormGroup,
    ControlLabel,
    Button,
    MenuItem
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBooks, deleteBooks, getBooks, resetButton} from "../../actions/booksActions";
import axios from 'axios';

class BooksForm extends React.Component {

    constructor() {
        super();
        this.state = {
            images: [{}],
            img: ''
        }
    }

    componentDidMount() {
        this.props.getBooks();
        //GET IMAGES FROM API
        axios.get('/api/images').then((response) => {
            this.setState({images: response.data});
        }).catch((error) => {
            this.setState({images: 'error when loading'});
        })
    }

    handleSubmit() {
        const book = [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            images: findDOMNode(this.refs.images).value,
            price: findDOMNode(this.refs.price).value,

        }];
        this.props.postBooks(book);
    }


    handleSelect = (item) => (e) => {
        e.preventDefault();
        debugger;
        //console.log(`This is enter on item, which is called  ${item}!`)
        this.setState({
            img: '/images/' + item
        });
    }

    onDelete() {
        let bookId = findDOMNode(this.refs.delete).value;
        this.props.deleteBooks(bookId);
    }

    resetForm() {
        //RESET THE BUTTON
        this.props.resetButton();
        findDOMNode(this.refs.title).value = '';
        findDOMNode(this.refs.description).value = '';
        findDOMNode(this.refs.price).value = '';
        this.setState({img: ''});
    }

    render() {

        const booksList = this.props.books.map(function (booksArr) {
            return (
                <option key={booksArr._id}>{booksArr._id}</option>
            )
        });

        const imgList = this.state.images.map((imgArr, i) => {
            debugger;
            return (
                <MenuItem key={i} eventKey={imgArr.name}
                          onClick={this.handleSelect(imgArr.name)}>{imgArr.name}</MenuItem>
            )
        });

        return (
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <InputGroup>
                                <FormControl type="text" ref="images" value={this.state.img}/>
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="input-dropdown-addon"
                                    title="Select an image"
                                    bsStyle="primary">
                                    {imgList}
                                </DropdownButton>
                            </InputGroup>
                            <Image src={this.state.img} responsive/>
                        </Panel>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <FormGroup controlId="title">
                                <ControlLabel>Title</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Title"
                                    ref="title">
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="description">
                                <ControlLabel>Description</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Description"
                                    ref="description">
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="price">
                                <ControlLabel>Price</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Price"
                                    ref="price">
                                </FormControl>
                            </FormGroup>
                            <Button bsStyle={(!this.props.style) ? ("primary") : this.props.style}
                                    onClick={(!this.props.msg) ? (this.handleSubmit.bind(this)): (this.resetForm.bind(this))}>{(!this.props.msg) ? ("Save Book") : this.props.msg}</Button>
                        </Panel>
                        <Panel style={{marginTop: '25px'}}>
                            <FormGroup>
                                <ControlLabel>Select a book id to delete</ControlLabel>
                                <FormControl ref="delete" componentClass="select" placeholder="select">
                                    <option value="select">select</option>
                                    {booksList}
                                </FormControl>
                            </FormGroup>
                            <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete Book</Button>
                        </Panel>
                    </Col>
                </Row>
            </Well>
        )
    }
}


function mapStateToProps(state) {
    return {
        books: state.books.books,
        msg: state.books.msg,
        style: state.books.style
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postBooks,
        deleteBooks,
        getBooks,
        resetButton
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);