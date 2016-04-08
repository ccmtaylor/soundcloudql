class Search extends React.Component {
  /*
    constructor(props) {
    super(props);

    const query = `
        query search($q: String!){
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
        data: props.data,
      fetcher: props.fetcher,
      searchBox: props.searchBox,
      resultList: props.resultList,
      query
    }
  }
  */

  render() {
    return (
      <div id="search">
        <SearchBox />
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


class SearchBox extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <form>
        <input type="search"/>
        </form>
    );
  }
}
