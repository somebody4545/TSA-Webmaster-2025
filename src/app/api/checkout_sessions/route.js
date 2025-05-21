import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    
    // Get form data from the request
    const formData = await request.formData()
    const cardType = formData.get('cardType') || 'standard'
    const amount = formData.get('amount') || '5'
    
    // Validate the amount is a number
    const parsedAmount = parseInt(amount)
    if (isNaN(parsedAmount)) {
      return NextResponse.json(
        { error: 'Invalid amount: must be a number' },
        { status: 400 }
      )
    }
    
    // Define valid amounts for each card type
    const validAmounts = {
      'standard': [5, 10, 25, 50],
      'veggie': [10, 25, 50, 100],
      'premium': [50, 100, 150, 200]
    }
    console.log('Parsed Amount:', parsedAmount)
    // Check if the amount is valid for the selected card type
    if (!validAmounts[cardType] || !validAmounts[cardType].includes(parsedAmount)) {
      return NextResponse.json(
        { error: `Invalid amount for ${cardType} card type` },
        { status: 400 }
      )
    }
    
    // Define gift card options with their properties
    const giftCardOptions = {
      'standard': {
        name: 'The Gift of Maitso',
        description: 'A standard gift card for Maitso Restaurant',
        price: parsedAmount * 100, // Convert to cents
        image: `${origin}/img/cards/image.png`
      },
      'veggie': {
        name: 'Veggie Delight Gift Card',
        description: 'Gift card with a special veggie design',
        price: parsedAmount * 100,
        image: `${origin}/img/cards/veggie.png`
      },
      'premium': {
        name: 'Premium Maitso Gift Card',
        description: 'Is it gold? No, but your meal will be!',
        price: parsedAmount * 100,
        image: `${origin}/img/cards/prem.png`
      }
    }
    
    // Ensure cardType is valid
    if (!giftCardOptions[cardType]) {
      return NextResponse.json(
        { error: 'Invalid card type' },
        { status: 400 }
      )
    }
    
    const selectedCard = giftCardOptions[cardType]

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedCard.name,
              description: selectedCard.description,
              images: [selectedCard.image],
            },
            unit_amount: selectedCard.price,
          },
          quantity: 1,
        },
      ],
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/gifts?canceled=true`,
    });
    
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}