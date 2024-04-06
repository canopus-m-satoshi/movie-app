## データ構造

users
  ├── userId1
  │   └── lists
  │       └── movies
  │           ├── movieId1
  │           │   ├── watchedAt: timestamp
  │           │   ├── comment: string
  │           │   ├── isFavorite: boolean
  │           │   ├── favoriteAddedAt: timestamp
  │           │   ├── isWatchlist: boolean
  │           │   ├── watchlistAddedAt: timestamp
  │           │   └── customLists
  │           │       ├── customListId1: { added: boolean, addedAt: timestamp }
  │           │       └── customListId2: { added: boolean, addedAt: timestamp }
  │           └── movieId2
  │               ├── watchedAt: timestamp
  │               ├── comment: string
  │               ├── isFavorite: boolean
  │               ├── favoriteAddedAt: timestamp
  │               ├── isWatchlist: boolean
  │               ├── watchlistAddedAt: timestamp
  │               └── customLists
  │                   ├── customListId1: { added: boolean, addedAt: timestamp }
  │                   └── customListId2: { added: boolean, addedAt: timestamp }
  └── userId2
      └── lists
          └── movies
              ├── movieId1
              │   ├── watchedAt: timestamp
              │   ├── comment: string
              │   ├── isFavorite: boolean
              │   ├── favoriteAddedAt: timestamp
              │   ├── isWatchlist: boolean
              │   ├── watchlistAddedAt: timestamp
              │   └── customLists
              │       ├── customListId1: { added: boolean, addedAt: timestamp }
              │       └── customListId2: { added: boolean, addedAt: timestamp }
              └── movieId2
                  ├── watchedAt: timestamp
                  ├── comment: string
                  ├── isFavorite: boolean
                  ├── favoriteAddedAt: timestamp
                  ├── isWatchlist: boolean
                  ├── watchlistAddedAt: timestamp
                  └── customLists
                      ├── customListId1: { added: boolean, addedAt: timestamp }
                      └── customListId2: { added: boolean, addedAt: timestamp }
