import React, { Component } from 'react';

class EditBookmark extends Component {
    state = {
        title: null,
        url: null,
        description: null,
        rating: null
    };

    componentDidMount() {
        const articleId = this.props.match.params.articleId;

        fetch(`https://localhost:8000/api/articles/${articleId}`, {
            method: 'GET'
        })
        .then(res => {
            if (!res.ok) {
              // get the error message from the response,
              return res.json().then(error => {
                // then throw it
                throw error
              })
            }
            return res.json()
          })
            .then(responseData => {
                this.setState({
                    
                })
            })
            .catch(error => {
                this.setState({ error })
              })
    }

    /* state for inputs etc... */
    render() {
        const { title, url, description, rating } = this.state
        return (
            <section className='EditArticleForm'>
                <h2>Edit article</h2>
                {//on submit the info should be sent to the api
                //populate the fields with the default data
                }
                <form>
                    <input
                        id='title'
                        type='text'
                        name='title'
                        required
                        value={title}
                        onChange={this.handleChangeTitle}
                    />
                    <input
                        id='url'
                        type='url'
                        name='url'
                        required
                        value={url}
                    //  onChange={this.handleChangeTitle}
                    />
                    <input
                        id='description'
                        type='text'
                        name='description'
                        required
                        value={description}
                    //  onChange={this.handleChangeTitle}
                    />
                    <input
                        id='rating'
                        type='number'
                        min="1"
                        max="5"
                        name='rating'
                        required
                        value={rating}
                    // onChange={this.handleChangeTitle}
                    />
                </form>
            </section>
        )
    }
}

export default EditBookmark;