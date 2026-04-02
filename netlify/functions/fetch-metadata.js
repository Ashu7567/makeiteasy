exports.handler = async (event) => {
  const targetUrl = event.queryStringParameters?.url;

  if (!targetUrl) {
    return {
      statusCode: 400,
      body: "Missing url parameter",
    };
  }

  try {
    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/xml,text/xml,*/*",
      },
    });

    const body = await res.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/xml",
      },
      body,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Fetch failed",
    };
  }
};
