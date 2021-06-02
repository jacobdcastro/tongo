import { NextApiRequest, NextApiResponse } from 'next';
import { getPopularSearchResults } from '../../../lib/popularSearches';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { search, filter, brand, filterOn, resultsLength } = req.body;
  try {
    if (req.method === 'POST') {
      const sortedResults = await getPopularSearchResults(
        search,
        filter,
        brand,
        filterOn,
        resultsLength
      );

      res.status(200);
      res.send(sortedResults);
    }
  } catch (error) {
    res.status(500);
    res.send(error);
    console.error('SERVERLESS FUNCTION: api/search/fetch', error);
  }
};
