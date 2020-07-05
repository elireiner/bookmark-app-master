import React, { Component } from 'react';
import config from '../config';
import BookmarksContext from '../BookmarksContext';

class EditBookmark extends Component {
    static defaultProps = {
        bookmarks: []
      };

      static contextType = BookmarksContext;
    /*state = {
        title: null,
        url: null,
        description: null,
        rating: null
    };

    componentDidMount() {
        const articleId = this.props.match.params.articleId;
      fetch(config.API_ENDPOINT + articleId, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
               // 'Authorization': `Bearer ${config.API_KEY}`
              }
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
    }*/

    /* state for inputs etc... */
    render() {
        const { bookmarks } = this.context
        const id = this.props.match.params.id
        const { title, url, description, rating } = bookmarks[id -1]
        return (
            <section className='EditArticleForm'>
                <h2>Edit article</h2>
                {//on submit the info should be sent to the api
                //populate the fields with the default data
                }
                <form onSubmit={this.handleSubmit}>
                    <input
                        id='title'
                        type='text'
                        name='title'
                        required
                        value={title}
                    />
                    <input
                        id='url'
                        type='url'
                        name='url'
                        required
                        value={url}
                    />
                    <input
                        id='description'
                        type='text'
                        name='description'
                        required
                        value={description}
                    />
                    <input
                        id='rating'
                        type='number'
                        min="1"
                        max="5"
                        name='rating'
                        required
                        value={rating}
                    />
                </form>
            </section>
        )
    }
}

export default EditBookmark;