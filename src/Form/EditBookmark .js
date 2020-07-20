import React, { Component } from 'react';
import config from '../config';
import PropTypes from 'prop-types';
import BookmarksContext from '../BookmarksContext';

const Required = () => (
    <span className='AddBookmark__required'>*</span>
)

class EditBookmark extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
        }),
        history: PropTypes.shape({
            push: PropTypes.func,
        }).isRequired,
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
            id:  parseInt(this.props.match.params.bookmarkId),
            title: title.value,
            url: url.value,
            description: description.value,
            rating: parseInt(rating.value),
        }
        this.setState({ error: null })
        fetch(config.API_ENDPOINT + this.props.match.params.bookmarkId, {
            method: 'PATCH',
            body: JSON.stringify(bookmark),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
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
            .then(() => {
                this.context.updateBookmark(bookmark)
                this.props.history.push('/')
              })
            .catch(error => {
                this.setState({ error })
            })
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    };

    render() {

        const { bookmarks } = this.context
        if (bookmarks.length > 0) {
            const id = this.props.match.params.bookmarkId
            const currentBookmark = bookmarks.filter(bm => bm.id === parseInt(id))[0]
            const { title, url, description, rating } = currentBookmark
            const { error } = this.state

            return (
                <section className='EditArticleForm'>
                    <h2>Edit article</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className='EditBookmark__error' role='alert'>
                            {error && <p>{error.message}</p>}
                        </div>
                        <input
                            type='hidden'
                            name='id'
                        />
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
                                defaultValue={title}
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
                                defaultValue={url}
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
                                defaultValue={description}
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
                                defaultValue={rating}
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