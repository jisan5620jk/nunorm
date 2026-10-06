# Nu Norm Shopify Theme

Custom Shopify theme for Nu Norm, built on Shopify's **Dawn 9.0.0** with brand-specific sections, product landing pages, and app integrations.

## Structure

```
assets/      CSS, JS, images, and fonts
config/      settings_schema.json (theme settings) and settings_data.json (current values)
layout/      theme.liquid (main), ecom.liquid (EComposer), password.liquid
locales/     Storefront and schema translations (en.default is the source)
sections/    Dawn sections plus custom Nu Norm sections
snippets/    Reusable partials, including app snippets
templates/   JSON/Liquid page templates; customers/ holds account templates
```

## Custom work

On top of Dawn, the theme adds:

- **Header:** `nunorm-header.liquid` (replaces the Dawn header; `backup-header.liquid` keeps a copy)
- **Product landing pages:** dedicated sections and templates for The Okuni Brush, Tinted Hydrator, Vera Sponge, Reset Wipes, Travel Bag, Brow Rescue, Brow Tamer, and Shine Eraser (`templates/product.<name>.json`)
- **Brand pages:** About / Our Story, Community, Press, Podcast, Tutorials, FAQ, Find Your Shade, Try-On, Giveaway, and Smile rewards landing page
- **Content sections:** before/after sliders, blog sliders and grid filters, marquees, countdown, ingredient highlights, video heroes, and FAQ accordions
- **Sections prefixed `akta-`:** agency-built components (metaobject content, recommendations, before/after, blog slider)

## App integrations

| App | Files |
| --- | --- |
| EComposer page builder | `layout/ecom.liquid`, `snippets/ecom_*`, `sections/ecom*`, `templates/index.ecomposer.liquid` |
| Judge.me reviews | `snippets/judgeme_*`, `templates/page.judgeme_all_reviews.liquid` |
| Bloggle | `templates/*bloggle*` |
| Klaviyo | loaded in `layout/theme.liquid` |
| SMSBump | `sections/smsbump_subscription_form_embed_263648.liquid` |

Some of these files are created and updated by the apps themselves. Editing them by hand can lead to your changes being overwritten.

## Local development

You need the [Shopify CLI](https://shopify.dev/docs/themes/tools/cli).

```bash
# Log in and preview against the store
shopify theme dev --store <store>.myshopify.com

# Pull the latest theme from the store (to pick up admin/customizer edits)
shopify theme pull --store <store>.myshopify.com

# Push to an unpublished theme for review
shopify theme push --unpublished --store <store>.myshopify.com

# Lint Liquid
shopify theme check
```

## Notes

- `config/settings_data.json` and the JSON templates change whenever someone edits the theme in the Shopify customizer. Pull before you start work so you don't overwrite those edits.
- Sections and templates whose names end in `-backup` or `-copy` are older versions kept for reference.
- `templates/page.about-us .liquid` has a space in its filename. Keep that in mind when you script against it.
