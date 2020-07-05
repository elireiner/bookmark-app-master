import React, { Component } from 'react';
import config from '../config';
import BookmarksContext from '../BookmarksContext';

const Required = () => (
    <span className='AddBookmark__required'>*</span>
)

class EditBookmark extends Component {
    static defaultProps = {
        bookmarks: []
    };

    state = {
        error: null
    }

    static contextType = BookmarksContext;

    handleSubmit = e => {
        e.preventDefault()
        // get the form fields from the event
        const { title, url, description, rating } = e.target
        const bookmark = {
            title: title.value,
            url: url.value,
            description: description.value,
            rating: rating.value,
        }
        this.setState({ error: null })
        fetch(config.API_ENDPOINT, {
            method: 'PATCH',
            body: JSON.stringify(bookmark),
            headers: {
                'content-type': 'application/json',
                // 'authorization': `bearer ${config.API_KEY}`
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
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    render() {

        const { bookmarks } = this.context
        if (bookmarks.length > 0) {
            const id = this.props.match.params.bookmarkId
            const { title, url, description, rating } = bookmarks[id - 1]
            const { error } = this.state

            return (
                <section className='EditArticleForm'>
                    <h2>Edit article</h2>
                    {//on submit the info should be sent to the api
                        //populate the fields with the default data
                    }
                    <form onSubmit={this.handleSubmit}>
                        <div className='EditBookmark__error' role='alert'>
                            {error && <p>{error.message}</p>}
                        </div>
                        <div>
                            <label htmlFor='title'>
                                Title
                            {' '}
                                <Required />
                            </label>
                            <input
                                id='title'
                                type='text'
                                name='title'
                                required
                                value={title}
                            />
                        </div>
                        <div>
                            <label htmlFor='url'>
                                URL
                            {' '}
                                <Required />
                            </label>
                            <input
                                id='url'
                                type='url'
                                name='url'
                                required
                                value={url}
                            />
                        </div>
                        <div>
                            <label htmlFor='description'>
                                Description
                        </label>
                            <input
                                id='description'
                                type='text'
                                name='description'
                                required
                                value={description}
                            />
                        </div>
                        <div>
                            <label htmlFor='rating'>
                                Rating
                            {' '}
                                <Required />
                            </label>
                            <input
                                id='rating'
                                type='number'
                                min="1"
                                max="5"
                                name='rating'
                                required
                                value={rating}
                            />
                        </div>
                        <div className='EditBookmark__buttons'>
                            <button type='button' onClick={this.handleClickCancel}>
                                Cancel
                        </button>
                            {' '}
                            <button type='submit'>
                                Save
                        </button>
                        </div>
                    </form>
                </section>
            )
        } else {
            return <></>
        }
    }
}

export default EditBookmark;