import { Box, Stack, Typography } from '@mui/material';

import { categories } from '../utils/constants';
import { colors } from '../utils/theme';

const sections = [...new Set(categories.map((category) => category.section))];

const CategoryButton = ({ category, selected, onSelect }) => (
  <button
    type="button"
    className={`category-btn${selected ? ' active' : ''}`}
    onClick={() => onSelect(category.name)}
    aria-pressed={selected}
  >
    <span className="category-icon">{category.icon}</span>
    <span>{category.name}</span>
  </button>
);

const Sidebar = ({ selectedCategory, setSelectedCategory }) => (
  <>
    {/* Desktop: vertical list grouped by section */}
    <Stack component="nav" aria-label="Categories" gap={0.25} sx={{ display: { xs: 'none', md: 'flex' } }}>
      {sections.map((section, index) => (
        <Box key={section}>
          {index > 0 && <Box sx={{ height: '1px', backgroundColor: colors.border, mx: 1.5, my: 1.5 }} />}
          <Typography
            component="p"
            sx={{ mx: 1.5, mt: 0.5, mb: 1, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.textMuted }}
          >
            {section}
          </Typography>
          <Stack gap={0.25}>
            {categories
              .filter((category) => category.section === section)
              .map((category) => (
                <CategoryButton
                  key={category.name}
                  category={category}
                  selected={category.name === selectedCategory}
                  onSelect={setSelectedCategory}
                />
              ))}
          </Stack>
        </Box>
      ))}
    </Stack>

    {/* Mobile: horizontal scrolling chips */}
    <Stack
      component="nav"
      aria-label="Categories"
      direction="row"
      gap={1}
      sx={{ display: { xs: 'flex', md: 'none' }, overflowX: 'auto', py: 0.5 }}
    >
      {categories.map((category) => (
        <CategoryButton
          key={category.name}
          category={category}
          selected={category.name === selectedCategory}
          onSelect={setSelectedCategory}
        />
      ))}
    </Stack>
  </>
);

export default Sidebar;
