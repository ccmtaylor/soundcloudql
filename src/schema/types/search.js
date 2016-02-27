import {
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType
} from 'graphql';

import {
  JSONDataWithPath
} from '../../api';

import { LicenseType, TrackType } from './track';
// import UserType from './user';

var SearchTracksType = {
  type: new GraphQLList(TrackType),
  args: {
    query: {type: new GraphQLNonNull(GraphQLString)},
    tags: {type: new GraphQLList(GraphQLString)},
    genres: {type: new GraphQLList(GraphQLString)},
    bpm: {
      type: new GraphQLInputObjectType({
        name: 'BPM',
        fields: {
          from: {type: new GraphQLNonNull(GraphQLInt) },
          to: { type: new GraphQLNonNull(GraphQLInt) }
        }
      })
    },
    duration: {
      type: new GraphQLInputObjectType({
        name: 'Duration',
        fields: {
          from: {type: new GraphQLNonNull(GraphQLInt) },
          to: { type: new GraphQLNonNull(GraphQLInt) }
        }
      })
    },
    license: {type: LicenseType }
  },
  description: 'Search for tracks on SoundCloud.',
  resolve: (_, args) => {
    let path = '/tracks?q=' + encodeURIComponent(args.query);
    if (args.tags) {
      path += '&tags=' + encodeURIComponent(args.tags.join());
    }
    if (args.genres) {
      path += '&genres=' + args.genres.join();
    }
    if (args.bpm) {
      path += '&bpm[from]=' + args.bpm.from;
      path += '&bpm[to]=' + args.bpm.to;
    }
    if (args.duration) {
      path += '&duration[from]=' + args.duration.from;
      path += '&duration[to]=' + args.duration.to;
    }
    if (args.license) {
      path += '&license=' + args.license;
    }
    return JSONDataWithPath(path);
  }
};

export default SearchTracksType;