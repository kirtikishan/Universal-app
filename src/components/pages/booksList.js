'use strict'
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from "../../actions/booksActions";
import {Grid, Col, Row, Button} from 'react-bootstrap';
import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';


class BooksList extends React.Component {

    componentDidMount() {
        this.props.getBooks();
    }

    render() {
        // start of bookslider
        debugger;
        const booksList = this.props.books.map(function (booksArr) {
            return (
                <Col xs={12} sm={6} md={4} key={booksArr._id}>
                    <BookItem
                        _id={booksArr._id}
                        title={booksArr.title}
                        description={booksArr.description}
                        images={booksArr.images}
                        price={booksArr.price}/>
                </Col>
            )
        });

        //end of bookslist

        return (
            <Grid>
                <Row>
                    <Cart/>
                </Row>
                <Row>
                    {booksList}
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getBooks: getBooks
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
