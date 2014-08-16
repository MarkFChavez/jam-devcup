require 'sidekiq/web'

Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  
  root "home#index"

  resources :messages

  mount Sidekiq::Web => '/sidekiq'
end
