class Search extends React.Component {
    constructor(props) {
        super(props);
        const query = `query search($q: String!){
            searchTracks(q: $q) {
                collection {
                    title,
                    permalinkUrl,
                    artworkUrl
                }
            },
            searchUsers(q: $q) {
                collection {
                    username,
                    avatarUrl,
                    permalinkUrl
                }
            },
            searchPlaylists(q:$q) {
                collection {
                    title,
                    permalinkUrl,
                    artworkUrl
                }
            }
        }`
        this.state = {
            query,
            q: ''
        }
    }

    search(query) {
        this.state.q = query.q;
        this.props.fetcher({query: this.state.query, variables: {q: this.state.q}}).then(json => console.log(json));
    }

  render() {
    return (
      <div id="search">
            <SearchBox onSearch={query => this.search(query)}/>
            <ResultList results={this.props.data} />
      </div>
    );
  }
}

class ResultList extends React.Component {


  render() {
    return (
            <div>
            <Items title="Tracks" items={this.props.results.data.searchTracks} mapper={
                item => (<Item title={item.title} permalinkUrl={item.permalinkUrl} imageUrl={item.artworkUrl} />)
            } />
            <Items title="Users" items={this.props.results.data.searchUsers} mapper={
                item => (<Item title={item.username} permalinkUrl={item.permalinkUrl} imageUrl={item.avatarUrl} />)
            } />
            <Items title="Playlists" items={this.props.results.data.searchPlaylists} mapper={
                item => (<Item title={item.title} permalinkUrl={item.permalinkUrl} imageUrl={item.artworkUrl} />)
            } />
            </div>
    );
  }
}

class Items extends React.Component {
    render() {
        var items = this.props.items.collection.map(item => this.props.mapper(item));
        return(
                <div className={this.props.className}>
                    <h3>{this.props.title}</h3>
                    {items}
                </div>
        )
    }
}

class Item extends React.Component {
    render() {
        return(
                <div className="item">
                <img src={this.props.imageUrl} />
                <a href={this.props.permalinkUrl}>{this.props.title}</a>
                </div>
        );
    }
}

function debounce(fn, delay) {
    var timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}


class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {q: ''};
        this.search = debounce(this.search, 500);
    }

    onChange(e) {
        this.setState({q: e.target.value.trim()});
        this.search();
    }

    onSubmit(e) {
        e.preventDefault();
        this.search();
    }

    search() {
        let q = this.state.q;
        if (!q) { return; }
        this.props.onSearch({q: q})
    }

    render() {
        return (
            <form className="searchBox" onSubmit={this.onSubmit.bind(this)}>
                <input
                    type="search"
                    placeholder="Search..."
                    value={this.state.q}
                    onChange={this.onChange.bind(this)}
                />
            </form>
        );
    }
}
