import {createSelector} from 'reselect';

import {sortFavorites} from '../../helpers/helpers.js';

const getFavorites = ({rUser}) => rUser.favorites;

export const getFavoriteOffers = createSelector(
    [getFavorites],
    (favorites) => sortFavorites(favorites)
);
