import React from 'react';
import {Image, Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from "../../actions/cartActions";

class BookItem extends React.Component {

    handleCart() {
        const book = [...this.props.cart, {
            _id: this.props._id,
            title: this.props.title,
            description: this.props.description,
            images: this.props.images,
            price: this.props.price,
            quantity: 1
        }];

        //check if cart is empty
        if (this.props.cart.length > 0) {
            let _id = this.props._id;
            let cartIndex = this.props.cart.findIndex(function (cart) {
                return cart._id === _id;
            })
            // if returns -1 no there are no items with same id
            if (cartIndex === -1) {
                this.props.addToCart(book);
            } else {
                // we need to update the quantatity
                this.props.updateCart(_id, 1, this.props.cart);
            }
        }
        else {
            this.props.addToCart(book);
        }
    }

    render() {
        return (
            <Well>
                <Row>
                    <Col xs={12} sm={4}>
                        <Image src={this.props.images} responsive/>
                    </Col>
                    <Col xs={6} sm={8}>
                        <h6>{this.props.title}</h6>
                        <p>{this.props.description}</p>
                        <h6>usd. {this.props.price}</h6>
                        <Button bsStyle='primary' onClick={this.handleCart.bind(this)}>Buy now</Button>
                    </Col>
                </Row>
            </Well>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addToCart: addToCart,
        updateCart: updateCart
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);