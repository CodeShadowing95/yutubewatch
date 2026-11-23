import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { Search } from '@mui/icons-material';

import { colors } from '../utils/theme';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const navigate = useNavigate();

  // Ctrl+K (or Cmd+K) focuses the search field from anywhere.
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm.trim()}`);
      setSearchTerm('');
      inputRef.current?.blur();
    }
  };

  return (
    <Box
      component="form"
      role="search"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        width: '100%',
        minWidth: 0,
        maxWidth: 560,
        height: 42,
        pl: { xs: 1.5, sm: 2 },
        pr: 0.75,
        boxSizing: 'border-box',
        borderRadius: 999,
        backgroundColor: colors.surface,
        border: `1px solid ${focused ? colors.accent : colors.borderStrong}`,
        boxShadow: focused ? `0 0 0 4px ${colors.accentSoft}` : 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <Search sx={{ fontSize: 20, color: colors.textMuted }} />
      <input
        ref={inputRef}
        type="search"
        className="search-bar"
        placeholder="Search videos, channels…"
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <Box
        component="kbd"
        className="search-shortcut"
        sx={{
          font: '500 11px Inter, sans-serif',
          color: colors.textMuted,
          border: '1px solid #333',
          borderRadius: '6px',
          px: 0.75,
          py: 0.4,
          whiteSpace: 'nowrap',
        }}
      >
        Ctrl K
      </Box>
      <Button
        type="submit"
        variant="contained"
        disableElevation
        sx={{ display: { xs: 'none', sm: 'inline-flex' }, height: 32, minWidth: 0, px: 2, borderRadius: 999, fontSize: 13, color: '#fff' }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
