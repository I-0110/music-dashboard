import postgres from 'postgres';
import { 
  Videos, 
  Category,
  Month, 
  Level, 
  LatestVideos,
  VideosTable, 
  VideoForm 
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchVideos() {
  try {
    const data = await sql<Videos[]>`SELECT * FROM videos`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch videos data.');
  }
}

export async function fetchLatestVideos() {
  try {
    const data = await sql<LatestVideos[]>`SELECT videos.date FROM videos`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch latest videos data.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const videoCountPromise = sql`SELECT COUNT(*) FROM videos`;
    const videoStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'published' THEN amount ELSE 0 END) AS "published",
         SUM(CASE WHEN status = 'draft' THEN amount ELSE 0 END) AS "draft"
         FROM videos`;

    const data = await Promise.all([
      videoCountPromise,
      videoStatusPromise,
    ]);

    const numberOfVideos = Number(data[0][0].count ?? '0');
    const totalPublishedVideos = Number(data[0][0].published ?? '0');
    const totalDraftVideos = Number(data[0][0].draft ?? '0');

    return {
      numberOfVideos,
      totalPublishedVideos,
      totalDraftVideos,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 5;

export async function fetchFilteredVideos(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const videos = await sql<VideosTable[]>`
      SELECT
        videos.id,
        videos.name,
        videos.url,
        videos.date,
        videos.category_id,
        videos.month_id,
        videos.level_id,
        videos.status
      FROM videos
      JOIN month ON videos.month_id = months.id
      WHERE
        months.name ILIKE ${`%${query}%`} OR
        videos.date::text ILIKE ${`%${query}%`} OR
        videos.status ILIKE ${`%${query}%`}
      ORDER BY videos.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return videos;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchFilteredByMonth(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const month = await sql<VideosTable[]>`
      SELECT
        videos.id,
        videos.name,
        videos.month
      FROM videos
      JOIN month ON videos.id = videos_id
      ORDER BY videos.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`
    
    return month;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch video by month.');
  }
}

export async function fetchFilteredByLevel(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const level = await sql<VideosTable[]>`
      SELECT
        videos.id,
        videos.name,
        videos.level
      FROM videos
      JOIN level ON videos.id = videos_id
      ORDER BY videos.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`
    
    return level;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch video by grade level.');
  }
}

export async function fetchFilteredByCategory(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const category = await sql<VideosTable[]>`
      SELECT
        videos.id,
        videos.name,
        videos.category
      FROM videos
      JOIN category ON videos.id = videos_id
      ORDER BY videos.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`
    
    return category;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch video by category.');
  }
}

export async function fetchVideosPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM videos
    JOIN month ON month.videos_id = videos.id
    WHERE
      videos.name ILIKE ${`%${query}%`} OR
      videos.month ILIKE ${`%${query}%`} OR
      videos.level ILIKE ${`%${query}%`} OR
      videos.category ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of videos.');
  }
}

export async function fetchVideoById(id: string) {
  try {
    const data = await sql<VideoForm[]>`
      SELECT
        videos.id,
        videos.name,
      FROM videos
      WHERE videos.id = ${id};
    `;
    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch video.');
  }
}

export async function fetchCategory() {
  try {
    const category = await sql<Category[]>`
      SELECT
        id,
        name
      FROM category
      ORDER BY name ASC
    `;

    return category;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all categories.');
  }
}

export async function fetchMonth() {
  try {
    const month = await sql<Month[]>`
      SELECT
        id,
        name
      FROM month
      ORDER BY id ASC
    `;

    return month;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all videos by months.');
  }
}

export async function fetchLevel() {
  try {
    const level = await sql<Level[]>`
      SELECT
        id,
        name
      FROM level
      ORDER BY id ASC
    `;

    return level;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all videos by grade levels.');
  }
}

// Original

// import {
//   CustomerField,
//   CustomersTableType,
//   InvoiceForm,
//   InvoicesTable,
//   LatestInvoiceRaw,
//   Revenue,
// } from './definitions';
// import { formatCurrency } from './utils';

// export async function fetchRevenue() {
//   try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

//     return data;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch revenue data.');
//   }
// }

// export async function fetchLatestInvoices() {
//   try {
//     const data = await sql<LatestInvoiceRaw[]>`
//       SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       ORDER BY invoices.date DESC
//       LIMIT 5`;

//     const latestInvoices = data.map((invoice) => ({
//       ...invoice,
//       amount: formatCurrency(invoice.amount),
//     }));
//     return latestInvoices;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch the latest invoices.');
//   }
// }

// export async function fetchCardData() {
//   try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
//     const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
//     const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
//     const invoiceStatusPromise = sql`SELECT
//          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//          FROM invoices`;

//     const data = await Promise.all([
//       invoiceCountPromise,
//       customerCountPromise,
//       invoiceStatusPromise,
//     ]);

//     const numberOfInvoices = Number(data[0][0].count ?? '0');
//     const numberOfCustomers = Number(data[1][0].count ?? '0');
//     const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
//     const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

//     return {
//       numberOfCustomers,
//       numberOfInvoices,
//       totalPaidInvoices,
//       totalPendingInvoices,
//     };
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch card data.');
//   }
// }

// const ITEMS_PER_PAGE = 6;
// export async function fetchFilteredInvoices(
//   query: string,
//   currentPage: number,
// ) {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   try {
//     const invoices = await sql<InvoicesTable[]>`
//       SELECT
//         invoices.id,
//         invoices.amount,
//         invoices.date,
//         invoices.status,
//         customers.name,
//         customers.email,
//         customers.image_url
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       WHERE
//         customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`} OR
//         invoices.amount::text ILIKE ${`%${query}%`} OR
//         invoices.date::text ILIKE ${`%${query}%`} OR
//         invoices.status ILIKE ${`%${query}%`}
//       ORDER BY invoices.date DESC
//       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
//     `;

//     return invoices;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch invoices.');
//   }
// }

// export async function fetchInvoicesPages(query: string) {
//   try {
//     const data = await sql`SELECT COUNT(*)
//     FROM invoices
//     JOIN customers ON invoices.customer_id = customers.id
//     WHERE
//       customers.name ILIKE ${`%${query}%`} OR
//       customers.email ILIKE ${`%${query}%`} OR
//       invoices.amount::text ILIKE ${`%${query}%`} OR
//       invoices.date::text ILIKE ${`%${query}%`} OR
//       invoices.status ILIKE ${`%${query}%`}
//   `;

//     const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch total number of invoices.');
//   }
// }

// export async function fetchInvoiceById(id: string) {
//   try {
//     const data = await sql<InvoiceForm[]>`
//       SELECT
//         invoices.id,
//         invoices.customer_id,
//         invoices.amount,
//         invoices.status
//       FROM invoices
//       WHERE invoices.id = ${id};
//     `;

//     const invoice = data.map((invoice) => ({
//       ...invoice,
//       // Convert amount from cents to dollars
//       amount: invoice.amount / 100,
//     }));

//     return invoice[0];
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch invoice.');
//   }
// }

// export async function fetchCustomers() {
//   try {
//     const customers = await sql<CustomerField[]>`
//       SELECT
//         id,
//         name
//       FROM customers
//       ORDER BY name ASC
//     `;

//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch all customers.');
//   }
// }

// export async function fetchFilteredCustomers(query: string) {
//   try {
//     const data = await sql<CustomersTableType[]>`
// 		SELECT
// 		  customers.id,
// 		  customers.name,
// 		  customers.email,
// 		  customers.image_url,
// 		  COUNT(invoices.id) AS total_invoices,
// 		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
// 		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
// 		FROM customers
// 		LEFT JOIN invoices ON customers.id = invoices.customer_id
// 		WHERE
// 		  customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`}
// 		GROUP BY customers.id, customers.name, customers.email, customers.image_url
// 		ORDER BY customers.name ASC
// 	  `;

//     const customers = data.map((customer) => ({
//       ...customer,
//       total_pending: formatCurrency(customer.total_pending),
//       total_paid: formatCurrency(customer.total_paid),
//     }));

//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch customer table.');
//   }
// }
