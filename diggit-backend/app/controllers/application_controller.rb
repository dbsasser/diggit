class ApplicationController < ActionController::API
    def encode_token(payload)
        JWT.encode(payload, ENV['diggit_jwt_key'])
      end
    
      def auth_header
        request.headers['Authorization']
      end
    
      def decoded_token
        if auth_header
          token = auth_header.split(' ')[1]
          begin
            JWT.decode(token, ENV['diggit_jwt_key'], true, algorithm: 'HS256')
          rescue JWT::DecodeError
            nil
          end
        end
      end
end
