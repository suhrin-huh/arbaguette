import { useCallback, useEffect, useState } from 'react';

import type { Decode } from '@/util/common/decodeToken';
import decodeToken from '@/util/common/decodeToken';

const useToken = () => {
  const [token, setToken] = useState<Decode | null>(null);

  const handleDecode = useCallback(async () => {
    const token = await decodeToken();
    setToken(token);
  }, []);

  useEffect(() => {
    handleDecode();
  }, [handleDecode]);

  return token;
};

export default useToken;
