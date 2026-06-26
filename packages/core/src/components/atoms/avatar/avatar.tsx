import { Component, Prop, State, h, Host, Mixin } from '@stencil/core';
import { SizeMixinFactory } from '../../../mixins/size.mixin';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Displays a user avatar with an image, initials, or icon as a fallback chain.
 * @part avatar - The inner container div.
 */
@Component({
  tag: 'rythm-avatar',
  styleUrl: 'avatar.css',
  shadow: true,
})
export class Avatar extends Mixin(SizeMixinFactory) {
  /** @internal Set to true when the src image fails to load. */
  @State() imgError = false;

  /** Accessible alt text for the image; also used as the host aria-label. */
  @Prop() alt?: string;

  /** Decorative primary-to-secondary gradient ring around the avatar. */
  @Prop({ reflect: true }) gradientBorder: boolean = false;

  /** Lucide icon name used as the last fallback when no src or initials are provided. */
  @Prop() icon: string = 'user';

  /** Up to two initials shown when no image is provided or it fails to load. */
  @Prop() initials?: string;

  /** Shape of the avatar container. Reflected to a host attribute so the gradient-border ring CSS can match it. */
  @Prop({ reflect: true }) shape: 'circle' | 'square' = 'circle';

  /** Image URL. */
  @Prop() src?: string;

  private onImgError() {
    this.imgError = true;
  }

  render() {
    const showImage = this.src && !this.imgError;
    const showInitials = !showImage && this.initials;
    const showIcon = !showImage && !showInitials;

    return (
      <Host role="img" aria-label={this.alt ?? this.initials ?? 'Avatar'}>
        <div
          class={{
            avatar: true,
            [`avatar--${this.size}`]: true,
            [`avatar--${this.shape}`]: true,
          }}
        >
          {showImage && (
            <img
              src={this.src}
              alt={this.alt ?? ''}
              onError={() => this.onImgError()}
              class="avatar__img"
            />
          )}
          {showInitials && (
            <span class="avatar__initials" aria-hidden="true">
              {this.initials!.slice(0, 2).toUpperCase()}
            </span>
          )}
          {showIcon && <rythm-icon name={this.icon} size="md" />}
        </div>
      </Host>
    );
  }
}
